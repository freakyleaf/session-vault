import { useNavigate, useParams } from 'react-router';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Dialog } from 'primereact/dialog';

import { useAlbumOperations } from '@backend-src/hooks/bxUseAlbumOperations';
import { useClerkAuth } from '@backend-src/hooks/bxUseClerkAuth';
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
  const { showError } = useToast();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | undefined>(
    undefined,
  );

  const {
    handleSingleAlbumActionDelete,
    handleSingleAlbumStateError,
    handleSingleAlbumStateSuccess,
    singleAlbumData,
    singleAlbumStateDeleting,
    singleAlbumStateError,
    singleAlbumStateLoading,
  } = useAlbumOperations({ albumId: id });

  const isEditing = useMemo(() => Boolean(selectedAlbum), [selectedAlbum]);

  const showContent = useMemo(
    () => !singleAlbumStateError && !singleAlbumStateLoading,
    [singleAlbumStateError, singleAlbumStateLoading],
  );

  useEffect(() => {
    if (singleAlbumStateError && !isDeleting) {
      showError('Failed to load album');
    }
  }, [isDeleting, showError, singleAlbumStateError]);

  const handleAlbumError = useCallback(() => {
    handleSingleAlbumStateError(isEditing);
  }, [handleSingleAlbumStateError, isEditing]);

  const handleAlbumSuccess = useCallback(async () => {
    await handleSingleAlbumStateSuccess(isEditing);
  }, [handleSingleAlbumStateSuccess, isEditing]);

  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
    setSelectedAlbum(undefined);
  }, []);

  const handleDeleteAlbum = useCallback(
    (album: IAlbum) => {
      confirmDialog({
        ...configConfirmDialogDefaultValues,
        accept: () => {
          setIsDeleting(true);
          handleSingleAlbumActionDelete(album)
            .then(() => {
              void navigate('/albums');
            })
            .catch(() => {
              setIsDeleting(false);
              showError('Failed to delete album');
            });
        },
        header: 'Confirm Delete',
        message: `Are you sure you want to delete the album '${album.title}'?`,
      });
    },
    [handleSingleAlbumActionDelete, navigate, showError],
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
          singleAlbumStateDeleting={singleAlbumStateDeleting}
          viewType={VIEW_TYPE_SINGLE}
        />
      </>
    );
  };

  return (
    <div className="bx-page bx-page--single-album">
      {singleAlbumStateLoading && <SxProgressSpinner />}

      {showContent && renderAlbumContent()}

      <Dialog
        {...configDialogDefaultValues}
        header="Edit Album"
        onHide={handleDialogOnHide}
        visible={dialogVisible}
      >
        <BxAddEditAlbum
          album={selectedAlbum}
          onClose={handleCloseDialog}
          onError={handleAlbumError}
          onSuccess={() => {
            void handleAlbumSuccess();
          }}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
}

export default BxPageSingleAlbum;
