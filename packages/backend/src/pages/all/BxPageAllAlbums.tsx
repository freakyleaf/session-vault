import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import { Toolbar } from 'primereact/toolbar';

import {
  useGetAllAdminAlbums,
  useGetAllArtistAlbums,
} from '@backend-src/hooks/queries/bxUseAlbumQueries';

import { useAlbumMutations } from '@backend-src/hooks/mutations/bxUseAlbumMutations';
import { useClerkAuth } from '@backend-src/hooks/bxUseClerkAuth';
import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';
import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';
import { useToast } from '@backend-src/hooks/bxUseToast';

import {
  configConfirmDialogDefaultValues,
  configDialogDefaultValues,
} from '@shared-src/lib/config';

import { VIEW_TYPE_ALL } from '@shared-src/lib/constants';

import type { IAlbum } from '@shared-src/lib/interfaces';
import type { MessagesMessage } from 'primereact/messages';

function BxPageAllAlbums() {
  useClerkAuth();
  usePageTitle('Albums');

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | undefined>(
    undefined,
  );

  const messages = useRef<Messages>(null);
  const { isAdmin } = useClerkUserRole();
  const { showErrorToast } = useToast();

  const messageNoAlbumsFound: MessagesMessage = useMemo(
    () => ({
      closable: false,
      detail: 'No albums found.',
      severity: 'info',
      sticky: true,
    }),
    [],
  );

  const { data: adminAlbumsData, error: adminAlbumsError } =
    useGetAllAdminAlbums({ isEnabled: isAdmin });
  const { data: artistAlbumsData, error: artistAlbumsError } =
    useGetAllArtistAlbums({ isEnabled: !isAdmin });

  const allAlbumsData = isAdmin ? adminAlbumsData : artistAlbumsData;
  const allAlbumsStateError = isAdmin ? adminAlbumsError : artistAlbumsError;

  const { deleteAlbum } = useAlbumMutations();
  const [singleAlbumStateDeleting, setSingleAlbumStateDeleting] = useState<
    string | null
  >(null);

  const hasAlbums = useMemo(
    () => allAlbumsData && allAlbumsData.length > 0,
    [allAlbumsData],
  );

  const showContent = useMemo(
    () => !allAlbumsStateError,
    [allAlbumsStateError],
  );

  useEffect(() => {
    if (!messages.current) return;

    messages.current.remove(messageNoAlbumsFound);

    if (!hasAlbums) {
      messages.current.show(messageNoAlbumsFound);
    }
  }, [hasAlbums, messageNoAlbumsFound]);

  useEffect(() => {
    if (allAlbumsStateError) {
      showErrorToast('Failed to load albums');
    }
  }, [allAlbumsStateError, showErrorToast]);

  const handleAddAlbum = useCallback(() => {
    setDialogVisible(true);
    setSelectedAlbum(undefined);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
    setSelectedAlbum(undefined);
  }, []);

  const handleAlbumSuccess = useCallback(() => {
    if (messages.current) {
      messages.current.remove(messageNoAlbumsFound);
    }
    handleCloseDialog();
  }, [handleCloseDialog, messageNoAlbumsFound]);

  const handleDeleteAlbum = useCallback(
    (album: IAlbum) => {
      confirmDialog({
        ...configConfirmDialogDefaultValues,
        accept: () => {
          setSingleAlbumStateDeleting(album._id);
          deleteAlbum(album._id)
            .then(() => {
              setSingleAlbumStateDeleting(null);
            })
            .catch(() => {
              setSingleAlbumStateDeleting(null);
            });
        },
        header: 'Confirm Delete',
        message: `Are you sure you want to delete the album '${album.title}'?`,
      });
    },
    [deleteAlbum],
  );

  const handleDialogOnHide = useCallback(() => {
    if (!dialogVisible) return;
    handleCloseDialog();
  }, [dialogVisible, handleCloseDialog]);

  const handleEditAlbum = useCallback((album: IAlbum) => {
    setDialogVisible(true);
    setSelectedAlbum(album);
  }, []);

  const toolbarEndContent = useMemo(
    () => (
      <Button
        icon="pi pi-add"
        label="Add New Album"
        onClick={handleAddAlbum}
      />
    ),
    [handleAddAlbum],
  );

  const renderAlbumContent = () => {
    return (
      <>
        <h1>Albums</h1>
        <Messages ref={messages} />
        <Toolbar
          className="mb-3"
          end={toolbarEndContent}
        />
        {renderAlbumList()}
      </>
    );
  };

  const renderAlbumList = () => {
    if (!allAlbumsData) return null;

    return (
      <ul className="bx-page-albums__list">
        {allAlbumsData.map((album: IAlbum, index: number) => (
          <li
            className={`bx-page-albums__list-item ${
              index !== allAlbumsData.length - 1 ? 'mb-3' : ''
            }`.trim()}
            key={album._id}
          >
            <BxAlbumCard
              album={album}
              handleDeleteAlbum={handleDeleteAlbum}
              handleEditAlbum={handleEditAlbum}
              singleAlbumStateDeleting={singleAlbumStateDeleting === album._id}
              viewType={VIEW_TYPE_ALL}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bx-page bx-page--all-albums">
      {showContent && renderAlbumContent()}

      <Dialog
        {...configDialogDefaultValues}
        header={selectedAlbum ? 'Edit Album' : 'Add New Album'}
        onHide={handleDialogOnHide}
        visible={dialogVisible}
      >
        <BxAddEditAlbumForm
          album={selectedAlbum}
          isModalForm={true}
          onClose={handleCloseDialog}
          onSuccess={handleAlbumSuccess}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}

export default BxPageAllAlbums;
