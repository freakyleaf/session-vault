import { useAuth } from '@clerk/clerk-react';

import { Button } from 'primereact/button';

import {
  INPUT_TYPE_CALENDAR,
  INPUT_TYPE_TEXT,
} from '@shared-src/lib/constants';

import type { IAlbum, IAlbumAddEditFormData } from '@shared-src/lib/interfaces';

interface BxAddEditAlbumProps {
  album?: IAlbum;
  onClose: () => void;
  onError: () => void;
  onSuccess: () => void;
}

function BxAddEditAlbum({
  album,
  onClose,
  onError,
  onSuccess,
}: BxAddEditAlbumProps) {
  const { userId } = useAuth() as { userId: string };

  const [formData, setFormData] = useState<IAlbumAddEditFormData>({
    isPublic: false,
    releaseDate: null,
    title: '',
  });

  const { mutateAsync: createAlbum, isPending: isCreating } = useCreateAlbum();
  const { mutateAsync: updateAlbum, isPending: isUpdating } = useUpdateAlbum();

  const isEditing = useMemo(() => Boolean(album), [album]);
  const isLoading = useMemo(
    () => isCreating || isUpdating,
    [isCreating, isUpdating],
  );
  const isValid = useMemo(
    () => formData.title.trim().length > 0,
    [formData.title],
  );

  useEffect(() => {
    if (album) {
      // Edit existing album
      setFormData({
        isPublic: album.isPublic,
        releaseDate: album.releaseDate,
        title: album.title,
      });
    } else {
      // Create new album
      setFormData({
        isPublic: false,
        releaseDate: null,
        title: '',
      });
    }
  }, [album, userId]);

  const handleInputChange = useCallback(
    <K extends keyof IAlbumAddEditFormData>(
      field: K,
      value: IAlbumAddEditFormData[K],
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
          isPublic: formData.isPublic,
          releaseDate: formData.releaseDate,
          title: formData.title,
        };

        if (isEditing && album) {
          await updateAlbum({
            data: {
              ...submitData,
              clerkId: album.clerkId,
            },
            id: album._id,
          });
        } else {
          await createAlbum({
            ...submitData,
            clerkId: userId,
          });
        }

        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error submitting album:', error);
        onError();
      }
    },
    [
      album,
      createAlbum,
      formData,
      isEditing,
      isValid,
      onClose,
      onError,
      onSuccess,
      updateAlbum,
      userId,
    ],
  );

  const handleIsPublicChange = useCallback(
    (value: boolean) => {
      handleInputChange('isPublic', value);
    },
    [handleInputChange],
  );

  const handleReleaseDateChange = useCallback(
    (value: unknown) => {
      handleInputChange('releaseDate', value as Date);
    },
    [handleInputChange],
  );

  const handleTitleChange = useCallback(
    (value: unknown) => {
      handleInputChange('title', value as string);
    },
    [handleInputChange],
  );

  return (
    <div className="bx-dialog-content">
      <form
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <BxFormInput
          className="mb-5"
          id="input-album-title"
          label="Album Title"
          name="album-title"
          onChange={handleTitleChange}
          required
          type={INPUT_TYPE_TEXT}
          value={formData.title}
        />

        <BxFormInput
          className="mb-5"
          helper="Leave blank if the album doesn't currently have a release date."
          id="input-album-release-date"
          label="Album Release Date"
          name="album-release-date"
          onChange={handleReleaseDateChange}
          type={INPUT_TYPE_CALENDAR}
          value={formData.releaseDate}
        />

        <BxFormToggle
          checked={formData.isPublic}
          helper="Leave unchecked if the album should be hidden from public view."
          id="input-album-is-public"
          label="Is Public"
          name="album-is-public"
          onChange={handleIsPublicChange}
        />

        <div className="bx-dialog-content__footer">
          <Button
            label="Cancel"
            onClick={onClose}
            severity="secondary"
            type="button"
          />
          <Button
            disabled={!isValid || isLoading}
            label={isEditing ? 'Update Album' : 'Add Album'}
            loading={isLoading}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default BxAddEditAlbum;
