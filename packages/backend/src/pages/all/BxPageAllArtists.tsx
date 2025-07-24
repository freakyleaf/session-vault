import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import { Toolbar } from 'primereact/toolbar';

import { useClerkAuth } from '@backend-src/hooks/bxUseClerkAuth';
import { useGetAllArtists } from '@backend-src/hooks/queries/bxUseArtistQueries';
import { usePageTitle } from '@backend-src/hooks/bxUsePageTitle';
import { useToast } from '@backend-src/hooks/bxUseToast';

import { configDialogDefaultValues } from '@shared-src/lib/config';

import { VIEW_TYPE_ALL } from '@shared-src/lib/constants';

import type { IArtist } from '@shared-src/lib/interfaces';
import type { MessagesMessage } from 'primereact/messages';

function BxPageAllArtists() {
  useClerkAuth();
  usePageTitle('Artists');

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<IArtist | undefined>(
    undefined,
  );

  const messages = useRef<Messages>(null);
  const { showErrorToast } = useToast();

  const messageNoArtistsFound: MessagesMessage = useMemo(
    () => ({
      closable: false,
      detail: 'No artists found.',
      severity: 'info',
      sticky: true,
    }),
    [],
  );

  const { data: allArtistsData, error: allArtistsStateError } =
    useGetAllArtists({ isEnabled: true });

  const hasArtists = useMemo(
    () => allArtistsData && allArtistsData.length > 0,
    [allArtistsData],
  );

  const showContent = useMemo(
    () => !allArtistsStateError,
    [allArtistsStateError],
  );

  useEffect(() => {
    if (!messages.current) return;

    messages.current.remove(messageNoArtistsFound);

    if (!hasArtists) {
      messages.current.show(messageNoArtistsFound);
    }
  }, [hasArtists, messageNoArtistsFound]);

  useEffect(() => {
    if (allArtistsStateError) {
      showErrorToast('Failed to load artists');
    }
  }, [allArtistsStateError, showErrorToast]);

  const handleAddArtist = useCallback(() => {
    setDialogVisible(true);
    setSelectedArtist(undefined);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogVisible(false);
    setSelectedArtist(undefined);
  }, []);

  const handleArtistSuccess = useCallback(() => {
    if (messages.current) {
      messages.current.remove(messageNoArtistsFound);
    }
    handleCloseDialog();
  }, [handleCloseDialog, messageNoArtistsFound]);

  const handleDialogOnHide = useCallback(() => {
    if (!dialogVisible) return;
    handleCloseDialog();
  }, [dialogVisible, handleCloseDialog]);

  const handleEditArtist = useCallback((artist: IArtist) => {
    setDialogVisible(true);
    setSelectedArtist(artist);
  }, []);

  const toolbarEndContent = useMemo(
    () => (
      <Button
        icon="pi pi-add"
        label="Add New Artist"
        onClick={handleAddArtist}
      />
    ),
    [handleAddArtist],
  );

  const renderArtistContent = () => {
    return (
      <>
        <h1>Artists</h1>
        <Messages ref={messages} />
        <Toolbar
          className="mb-3"
          end={toolbarEndContent}
        />
        {renderArtistList()}
      </>
    );
  };

  const renderArtistList = () => {
    if (!allArtistsData) return null;

    return (
      <ul className="bx-page-artists__list">
        {allArtistsData.map((artist: IArtist, index: number) => (
          <li
            className={`bx-page-artists__list-item${
              index !== allArtistsData.length - 1 ? ' mb-3' : ''
            }`}
            key={artist._id}
          >
            <BxArtistCard
              artist={artist}
              handleEditArtist={handleEditArtist}
              viewType={VIEW_TYPE_ALL}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bx-page bx-page--all-artists">
      {showContent && renderArtistContent()}

      <Dialog
        {...configDialogDefaultValues}
        header={selectedArtist ? 'Edit Artist' : 'Add New Artist'}
        onHide={handleDialogOnHide}
        visible={dialogVisible}
      >
        <BxAddEditArtistForm
          artist={selectedArtist}
          isModalForm={true}
          onClose={handleCloseDialog}
          onSuccess={handleArtistSuccess}
        />
      </Dialog>
    </div>
  );
}

export default BxPageAllArtists;
