import { useAuth } from '@clerk/clerk-react';

import { Button } from 'primereact/button';

import { useArtist } from '@backend-src/hooks/bxUseArtist';
import { useArtistMutations } from '@backend-src/hooks/mutations/bxUseArtistMutations';
import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

import { INPUT_TYPE_TEXT } from '@shared-src/lib/constants';

import type {
  IArtist,
  IArtistAddEditFormData,
} from '@shared-src/lib/interfaces';

interface BxAddEditArtistFormProps {
  artist?: IArtist;
  isModalForm: boolean;
  onClose?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
}

function BxAddEditArtistForm({
  artist,
  isModalForm,
  onClose,
  onError,
  onSuccess,
}: BxAddEditArtistFormProps) {
  const { isAdmin } = useClerkUserRole();
  const { userId } = useAuth() as { userId: string };
  const { refetchArtist } = useArtist();

  const [formData, setFormData] = useState<IArtistAddEditFormData>({
    artistName: '',
    isActive: true,
  });

  const { createArtist, updateArtist } = useArtistMutations();

  const isEditing = useMemo(() => Boolean(artist), [artist]);
  const isValid = useMemo(
    () => formData.artistName.trim().length > 0,
    [formData.artistName],
  );

  useEffect(() => {
    if (artist) {
      // Edit existing artist
      setFormData({
        artistName: artist.artistName,
        isActive: artist.isActive,
      });
    } else {
      // Create new artist
      setFormData({
        artistName: '',
        isActive: true,
      });
    }
  }, [artist]);

  const handleInputChange = useCallback(
    <K extends keyof IArtistAddEditFormData>(
      field: K,
      value: IArtistAddEditFormData[K],
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!isValid) return;

      try {
        const submitData = {
          artistName: formData.artistName,
          isActive: formData.isActive,
        };

        if (artist && isEditing) {
          await updateArtist({
            _id: artist._id,
            data: {
              ...submitData,
              clerkId: artist.clerkId,
            },
          });
        } else {
          await createArtist({
            data: {
              ...submitData,
              clerkId: userId,
            },
          });
        }

        // Refetch artist data to update navigation and access
        void refetchArtist();

        if (onSuccess) {
          onSuccess();
        }

        if (isModalForm && onClose) {
          onClose();
        }
      } catch {
        if (onError) {
          onError();
        }
      }
    },
    [
      artist,
      createArtist,
      formData,
      isEditing,
      isModalForm,
      isValid,
      onError,
      onClose,
      onSuccess,
      refetchArtist,
      updateArtist,
      userId,
    ],
  );

  const handleIsActiveChange = useCallback(
    (value: boolean) => {
      handleInputChange('isActive', value);
    },
    [handleInputChange],
  );

  const handleArtistNameChange = useCallback(
    (value: unknown) => {
      handleInputChange('artistName', value as string);
    },
    [handleInputChange],
  );

  return (
    <form
      className="bx-form"
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      <BxFormInput
        className="mb-5"
        id="input-artist-name"
        label="Artist Name"
        name="artist-name"
        onChange={handleArtistNameChange}
        required
        type={INPUT_TYPE_TEXT}
        value={formData.artistName}
      />

      {isAdmin && (
        <BxFormToggle
          checked={formData.isActive}
          helper="Leave unchecked if the artist should be inactive."
          id="input-artist-is-active"
          label="Is Active"
          name="artist-is-active"
          onChange={handleIsActiveChange}
        />
      )}

      <div className="bx-form__footer">
        {isModalForm && onClose && (
          <Button
            label="Close"
            onClick={onClose}
            severity="secondary"
            type="button"
          />
        )}
        <Button
          disabled={!isValid}
          label={isEditing ? 'Update Artist' : 'Add Artist'}
          type="submit"
        />
      </div>
    </form>
  );
}

export default BxAddEditArtistForm;
