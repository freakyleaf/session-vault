import { useParams } from 'react-router';

import { Dialog } from 'primereact/dialog';

import { useClerkAuth } from '@backend-src/hooks/bxUseClerkAuth';
import { useGetSingleArtist } from '@backend-src/hooks/queries/bxUseArtistQueries';
import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';

import { configDialogDefaultValues } from '@shared-src/lib/config';

import { ID_TYPE_MONGO, VIEW_TYPE_SINGLE } from '@shared-src/lib/constants';

function BxPageSingleArtist() {
  useClerkAuth();
  usePageTitle('Artist');

  const { id } = useParams();

  const [dialogVisible, setDialogVisible] = useState(false);
  const { data: singleArtistData, error: singleArtistStateError } =
    useGetSingleArtist({
      id: id || '',
      idType: ID_TYPE_MONGO,
    });

  const showContent = useMemo(
    () => !singleArtistStateError,
    [singleArtistStateError],
  );


  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
  }, []);

  const handleArtistSuccess = useCallback(() => {
    handleCloseDialog();
  }, [handleCloseDialog]);

  const handleEditArtist = useCallback(() => {
    setDialogVisible(true);
  }, []);

  const handleDialogOnHide = useCallback(() => {
    if (!dialogVisible) return;
    handleCloseDialog();
  }, [dialogVisible, handleCloseDialog]);

  const renderArtistContent = () => {
    if (!singleArtistData) return null;

    return (
      <>
        <h1>Artist: {singleArtistData.artistName}</h1>
        <BxArtistCard
          artist={singleArtistData}
          handleEditArtist={() => handleEditArtist()}
          viewType={VIEW_TYPE_SINGLE}
        />
      </>
    );
  };

  return (
    <div className="bx-page bx-page--single-artist">
      {showContent && renderArtistContent()}

      <Dialog
        {...configDialogDefaultValues}
        header="Edit Artist"
        onHide={handleDialogOnHide}
        visible={dialogVisible}
      >
        <BxAddEditArtistForm
          artist={singleArtistData}
          isModalForm={true}
          onClose={handleCloseDialog}
          onSuccess={handleArtistSuccess}
        />
      </Dialog>
    </div>
  );
}

export default BxPageSingleArtist;
