import { useNavigate, useParams } from 'react-router';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Dialog } from 'primereact/dialog';

import { useAlbumMutations } from '@backend-src/hooks/mutations/bxUseAlbumMutations';
import { useClerkAuth } from '@backend-src/hooks/bxUseClerkAuth';
import { useGetSingleAlbum } from '@backend-src/hooks/queries/bxUseAlbumQueries';
import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';
import { useToast } from '@backend-src/hooks/bxUseToast';

import {
  configConfirmDialogDefaultValues,
  configDialogDefaultValues,
} from '@shared-src/lib/config';

import { VIEW_TYPE_SINGLE } from '@shared-src/lib/constants';

import type { IAlbum } from '@shared-src/lib/interfaces';

function BxPageSingleAlbum() {
  useClerkAuth();
  usePageTitle('Album');

  const navigate = useNavigate();
  const { id } = useParams();
  const { showErrorToast } = useToast();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | undefined>(
    undefined,
  );

  const { data: singleAlbumData, error: singleAlbumStateError } =
    useGetSingleAlbum({ id: id! });
  const { deleteAlbum } = useAlbumMutations();
  const [singleAlbumStateDeleting, setSingleAlbumStateDeleting] = useState<
    string | null
  >(null);

  const showContent = useMemo(
    () => !singleAlbumStateError,
    [singleAlbumStateError],
  );

  const handleAlbumError = useCallback(() => {
    showErrorToast('Failed to save album');
  }, [showErrorToast]);

  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
    setSelectedAlbum(undefined);
  }, []);

  const handleAlbumSuccess = useCallback(() => {
    handleCloseDialog();
  }, [handleCloseDialog]);

  const handleDeleteAlbum = useCallback(
    (album: IAlbum) => {
      confirmDialog({
        ...configConfirmDialogDefaultValues,
        accept: () => {
          setSingleAlbumStateDeleting(album._id);
          deleteAlbum(album._id)
            .then(() => {
              void navigate('/albums');
            })
            .catch(() => {
              setSingleAlbumStateDeleting(null);
            });
        },
        header: 'Confirm Delete',
        message: `Are you sure you want to delete the album '${album.title}'?`,
      });
    },
    [deleteAlbum, navigate],
  );

  const handleEditAlbum = useCallback((album: IAlbum) => {
    setDialogVisible(true);
    setSelectedAlbum(album);
  }, []);

  const handleDialogOnHide = useCallback(() => {
    if (!dialogVisible) return;
    handleCloseDialog();
  }, [dialogVisible, handleCloseDialog]);

  const renderAlbumContent = () => {
    if (!singleAlbumData) return null;

    return (
      <>
        <h1>Album: {singleAlbumData.title}</h1>
        <BxAlbumCard
          album={singleAlbumData}
          handleDeleteAlbum={handleDeleteAlbum}
          handleEditAlbum={handleEditAlbum}
          singleAlbumStateDeleting={Boolean(singleAlbumStateDeleting)}
          viewType={VIEW_TYPE_SINGLE}
        />
      </>
    );
  };

  return (
    <div className="bx-page bx-page--single-album">
      {showContent && renderAlbumContent()}

      <Dialog
        {...configDialogDefaultValues}
        header="Edit Album"
        onHide={handleDialogOnHide}
        visible={dialogVisible}
      >
        <BxAddEditAlbumForm
          album={selectedAlbum}
          isModalForm={true}
          onClose={handleCloseDialog}
          onError={handleAlbumError}
          onSuccess={handleAlbumSuccess}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}

export default BxPageSingleAlbum;
