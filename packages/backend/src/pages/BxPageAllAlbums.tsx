import { AnimatePresence, motion } from 'framer-motion';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import { Toolbar } from 'primereact/toolbar';

import { useAlbumOperations } from '@backend-src/hooks/bxUseAlbumOperations';
import { useClerkAuth } from '@backend-src/hooks/bxUseClerkAuth';
import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';
import { useToast } from '@backend-src/hooks/bxUseToast';

import {
  configConfirmDialogDefaultValues,
  configDialogDefaultValues,
} from '@shared-src/lib/config';

import {
  STYLE_TRANSITION_DURATION,
  STYLE_TRANSITION_EASE,
  VIEW_TYPE_ALL,
} from '@shared-src/lib/constants';

import type { IAlbum } from '@shared-src/lib/interfaces';
import type { MessagesMessage } from 'primereact/messages';

function BxPageAllAlbums() {
  useClerkAuth();
  usePageTitle('Albums');

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | undefined>(
    undefined,
  );

  const { showError } = useToast();
  const messages = useRef<Messages>(null);

  const messageNoAlbumsFound: MessagesMessage = useMemo(
    () => ({
      closable: false,
      detail: 'No albums found.',
      severity: 'info',
      sticky: true,
    }),
    [],
  );

  const {
    allAlbumsData,
    allAlbumsStateError,
    allAlbumsStateLoading,
    handleSingleAlbumActionDelete,
    handleSingleAlbumStateError,
    handleSingleAlbumStateSuccess,
    singleAlbumStateDeleting,
  } = useAlbumOperations();

  const hasAlbums = useMemo(
    () => allAlbumsData && allAlbumsData.length > 0,
    [allAlbumsData],
  );

  const isEditing = useMemo(() => Boolean(selectedAlbum), [selectedAlbum]);

  const showContent = useMemo(
    () => !allAlbumsStateError && !allAlbumsStateLoading,
    [allAlbumsStateError, allAlbumsStateLoading],
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
      showError('Failed to load albums');
    }
  }, [allAlbumsStateError, showError]);

  const handleAddAlbum = useCallback(() => {
    setDialogVisible(true);
    setSelectedAlbum(undefined);
  }, []);

  const handleAlbumError = useCallback(() => {
    handleSingleAlbumStateError(isEditing);
  }, [handleSingleAlbumStateError, isEditing]);

  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
    setSelectedAlbum(undefined);
  }, []);

  const handleDeleteAlbum = useCallback(
    (album: IAlbum) => {
      confirmDialog({
        ...configConfirmDialogDefaultValues,
        accept: () => {
          handleSingleAlbumActionDelete(album).catch(() => {
            showError('Failed to delete album');
          });
        },
        header: 'Confirm Delete',
        message: `Are you sure you want to delete the album '${album.title}'?`,
      });
    },
    [handleSingleAlbumActionDelete, showError],
  );

  const handleDialogOnHide = useCallback(() => {
    if (!dialogVisible) return;
    handleCloseDialog();
  }, [dialogVisible, handleCloseDialog]);

  const handleEditAlbum = useCallback((album: IAlbum) => {
    setDialogVisible(true);
    setSelectedAlbum(album);
  }, []);

  const handleSingleAlbumStateSuccessWrapper = useCallback(async () => {
    if (messages.current) {
      messages.current.remove(messageNoAlbumsFound);
    }
    await handleSingleAlbumStateSuccess(isEditing);
  }, [handleSingleAlbumStateSuccess, isEditing, messageNoAlbumsFound]);

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
        <AnimatePresence mode="popLayout">
          {allAlbumsData.map((album, index) => (
            <motion.li
              animate={{ opacity: 1 }}
              className={`bx-page-albums__list-item${
                index !== allAlbumsData.length - 1 ? ' mb-3' : ''
              }`}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={album._id}
              layout
              transition={{
                duration: STYLE_TRANSITION_DURATION,
                ease: STYLE_TRANSITION_EASE,
              }}
            >
              <BxAlbumCard
                album={album}
                handleDeleteAlbum={handleDeleteAlbum}
                handleEditAlbum={handleEditAlbum}
                singleAlbumStateDeleting={singleAlbumStateDeleting}
                viewType={VIEW_TYPE_ALL}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    );
  };

  return (
    <div className="bx-page bx-page--all-albums">
      {allAlbumsStateLoading && <SxProgressSpinner />}

      {showContent && renderAlbumContent()}

      <Dialog
        {...configDialogDefaultValues}
        header={selectedAlbum ? 'Edit Album' : 'Add New Album'}
        onHide={handleDialogOnHide}
        visible={dialogVisible}
      >
        <BxAddEditAlbum
          album={selectedAlbum}
          onClose={handleCloseDialog}
          onError={handleAlbumError}
          onSuccess={() => {
            void handleSingleAlbumStateSuccessWrapper();
          }}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}

export default BxPageAllAlbums;
