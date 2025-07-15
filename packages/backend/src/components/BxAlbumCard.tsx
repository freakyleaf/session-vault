import { useNavigate } from 'react-router';

import { Button } from 'primereact/button';

import { VIEW_TYPE_ALL } from '@shared-src/lib/constants';

import type { TReleaseDate, TViewType } from '@shared-root/src/lib/types';
import type { IAlbum } from '@shared-src/lib/interfaces';

interface BxAlbumCardProps {
  album: IAlbum;
  handleDeleteAlbum: (album: IAlbum) => void;
  handleEditAlbum: (album: IAlbum) => void;
  singleAlbumStateDeleting: boolean;
  viewType: TViewType;
}

function BxAlbumCard({
  album,
  handleDeleteAlbum,
  handleEditAlbum,
  singleAlbumStateDeleting,
  viewType,
}: BxAlbumCardProps) {
  const { isAdmin } = useClerkUserRole();
  const navigate = useNavigate();

  const handleDeleteAlbumButtonClick = useCallback(() => {
    handleDeleteAlbum(album);
  }, [handleDeleteAlbum, album]);

  const handleEditAlbumButtonClick = useCallback(() => {
    handleEditAlbum(album);
  }, [handleEditAlbum, album]);

  const handleViewAlbumButtonClick = useCallback(() => {
    void navigate(`./${album._id}`);
  }, [navigate, album._id]);

  const formatReleaseDate = (date: TReleaseDate) => {
    if (!date) return 'Unspecified';
    return new Date(date).toLocaleDateString();
  };

  const isViewAllType = viewType === VIEW_TYPE_ALL;
  const songsCount = album.songs?.length || 0;

  return (
    <div className="bx-album-card">
      <h2 className="bx-album-card__heading">{album.title}</h2>
      <table className="bx-table">
        <tbody>
          {isAdmin && (
            <tr>
              <th>Artist</th>
              <td>{album.clerkId}</td>
            </tr>
          )}
          <tr>
            <th>Public</th>
            <td>{album.isPublic ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <th>Release date</th>
            <td>{formatReleaseDate(album.releaseDate)}</td>
          </tr>
          <tr>
            <th>Songs</th>
            <td>{songsCount}</td>
          </tr>
        </tbody>
      </table>

      <div className="bx-album-card__utility">
        {isViewAllType && (
          <Button
            label="View Album"
            onClick={handleViewAlbumButtonClick}
          />
        )}
        <Button
          label="Edit Album"
          onClick={handleEditAlbumButtonClick}
        />
        <Button
          disabled={singleAlbumStateDeleting}
          label={singleAlbumStateDeleting ? 'Deleting...' : 'Delete Album'}
          loading={singleAlbumStateDeleting}
          onClick={handleDeleteAlbumButtonClick}
          severity="danger"
        />
      </div>
    </div>
  );
}

export default BxAlbumCard;
