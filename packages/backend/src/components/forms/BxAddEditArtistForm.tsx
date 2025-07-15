import { useAuth } from '@clerk/clerk-react';

import { Button } from 'primereact/button';

import {
  useCreateArtistMutation,
  useGetArtistQuery,
  useUpdateArtistMutation,
} from '@shared-src/stores/api/storeArtistApi';

import { INPUT_TYPE_TEXT } from '@shared-src/lib/constants';

import type { IArtistAddEditFormData } from '@shared-src/lib/interfaces';

function BxAddEditArtistForm() {
  const { isAdmin } = useClerkUserRole();
  const { userId } = useAuth() as { userId: string };

  const { data, error, isLoading: artistLoading } = useGetArtistQuery(userId);

  const [formData, setFormData] = useState<IArtistAddEditFormData>({
    artistName: '',
    isActive: true,
  });

  const [createArtist, { isLoading: isCreating }] = useCreateArtistMutation();
  const [updateArtist, { isLoading: isUpdating }] = useUpdateArtistMutation();

  const isEditing = useMemo(() => Boolean(data), [data]);
  const isLoading = useMemo(
    () => artistLoading || isCreating || isUpdating,
    [artistLoading, isCreating, isUpdating],
  );
  const isValid = useMemo(
    () => formData.artistName.trim().length > 0,
    [formData.artistName],
  );

  useEffect(() => {
    if (data) {
      // Edit existing artist
      setFormData({
        artistName: data.artistName,
        isActive: data.isActive,
      });
    } else {
      // Create new artist
      setFormData({
        artistName: '',
        isActive: true,
      });
    }
  }, [data, userId]);

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
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isValid) return;

      try {
        const submitData = {
          artistName: formData.artistName,
          isActive: formData.isActive,
        };

        if (isEditing && data) {
          await updateArtist({
            artistId: data._id,
            data: {
              ...submitData,
              clerkId: data.clerkId,
            },
          }).unwrap();
        } else {
          await createArtist({
            ...submitData,
            clerkId: userId,
          }).unwrap();
        }
      } catch (error) {
        console.error('Error submitting artist:', error);
      }
    },
    [createArtist, data, formData, isEditing, isValid, updateArtist, userId],
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
    <div className="bx-form">
      <form
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
          <Button
            disabled={!isValid || isLoading}
            label={isEditing ? 'Update Artist' : 'Add Artist'}
            loading={isLoading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default BxAddEditArtistForm;
