import { useNavigate } from 'react-router';

import { Button } from 'primereact/button';

import { VIEW_TYPE_ALL } from '@shared-src/lib/constants';

import type { IArtist } from '@shared-src/lib/interfaces';
import type { TViewType } from '@shared-src/lib/types';

interface BxArtistCardProps {
  artist: IArtist;
  handleEditArtist: (artist: IArtist) => void;
  viewType: TViewType;
}

function BxArtistCard({
  artist,
  handleEditArtist,
  viewType,
}: BxArtistCardProps) {
  const navigate = useNavigate();

  const handleEditArtistButtonClick = useCallback(() => {
    handleEditArtist(artist);
  }, [artist, handleEditArtist]);

  const handleViewArtistButtonClick = useCallback(() => {
    void navigate(`./${artist._id}`);
  }, [artist, navigate]);

  const isViewAllType = viewType === VIEW_TYPE_ALL;

  return (
    <div className="bx-card">
      <h2 className="bx-card__heading">{artist.artistName}</h2>
      <table className="bx-table">
        <tbody>
          <tr>
            <th>Clerk ID</th>
            <td>
              <span className="code code--inline">{artist.clerkId}</span>
            </td>
          </tr>
          <tr>
            <th>Active</th>
            <td>
              <BxTextNoYes value={artist.isActive} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bx-card__utility">
        {isViewAllType && (
          <Button
            label="View Artist"
            onClick={handleViewArtistButtonClick}
          />
        )}
        <Button
          label="Edit Artist"
          onClick={handleEditArtistButtonClick}
        />
      </div>
    </div>
  );
}

export default BxArtistCard;
