import { Link, useNavigate } from 'react-router';

import { Button } from 'primereact/button';

import { useClerkUserRole } from '@backend-src/hooks/bxUseClerkUserRole';

import { useArtistStore } from '@backend-src/stores/bxArtistStore';

import { VIEW_TYPE_ALL } from '@shared-src/lib/constants';

import type { TReleaseDate, TViewType } from '@shared-src/lib/types';
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
  const { artists } = useArtistStore();
  const { isAdmin } = useClerkUserRole();
  const navigate = useNavigate();

  const artist = useMemo(
    () => artists?.find((artist) => artist.clerkId === album.clerkId) || null,
    [album, artists],
  );

  const handleDeleteAlbumButtonClick = useCallback(() => {
    handleDeleteAlbum(album);
  }, [album, handleDeleteAlbum]);

  const handleEditAlbumButtonClick = useCallback(() => {
    handleEditAlbum(album);
  }, [album, handleEditAlbum]);

  const handleViewAlbumButtonClick = useCallback(() => {
    void navigate(`./${album._id}`);
  }, [album, navigate]);

  const formatReleaseDate = (date: TReleaseDate) => {
    if (!date) return 'Unspecified';
    return new Date(date).toLocaleDateString();
  };

  const isViewAllType = viewType === VIEW_TYPE_ALL;
  const songsCount = album.songs?.length || 0;

  return (
    <div className="bx-card">
      <h2 className="bx-card__heading">{album.title}</h2>
      <table className="bx-table">
        <tbody>
          {isAdmin && (
            <tr>
              <th>Artist</th>
              <td>
                <Link to={`/artists/${artist?._id}`}>{artist?.artistName}</Link>
              </td>
            </tr>
          )}
          <tr>
            <th>Public</th>
            <td>
              <BxTextNoYes value={album.isPublic} />
            </td>
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

      <div className="bx-card__utility">
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
