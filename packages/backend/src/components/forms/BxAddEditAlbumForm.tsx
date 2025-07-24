import { useAuth } from '@clerk/clerk-react';

import { Button } from 'primereact/button';

import { useAlbumMutations } from '@backend-src/hooks/mutations/bxUseAlbumMutations';

import {
  INPUT_TYPE_CALENDAR,
  INPUT_TYPE_TEXT,
} from '@shared-src/lib/constants';

import type { IAlbum, IAlbumAddEditFormData } from '@shared-src/lib/interfaces';
import type { TId } from '@shared-src/lib/types';

interface BxAddEditAlbumFormProps {
  album?: IAlbum;
  isModalForm: boolean;
  onClose?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
}

function BxAddEditAlbumForm({
  album,
  isModalForm,
  onClose,
  onError,
  onSuccess,
}: BxAddEditAlbumFormProps) {
  const { userId } = useAuth() as { userId: TId };

  const [formData, setFormData] = useState<IAlbumAddEditFormData>({
    isPublic: false,
    releaseDate: null,
    title: '',
  });

  const { createAlbum, updateAlbum } = useAlbumMutations();

  const isEditing = useMemo(() => Boolean(album), [album]);
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
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!isValid) return;

      try {
        const submitData = {
          isPublic: formData.isPublic,
          releaseDate: formData.releaseDate,
          title: formData.title,
        };

        if (album && isEditing) {
          await updateAlbum({
            _id: album._id,
            data: {
              ...submitData,
              clerkId: album.clerkId,
            },
          });
        } else {
          await createAlbum({
            data: {
              ...submitData,
              clerkId: userId,
            },
          });
        }

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
      album,
      createAlbum,
      formData,
      isEditing,
      isModalForm,
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
    <form
      className="bx-form"
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

      <div className="bx-form__footer">
        {isModalForm && (
          <Button
            label="Close"
            onClick={onClose}
            severity="secondary"
            type="button"
          />
        )}
        <Button
          disabled={!isValid}
          label={isEditing ? 'Update Album' : 'Add Album'}
          type="submit"
        />
      </div>
    </form>
  );
}

export default BxAddEditAlbumForm;
