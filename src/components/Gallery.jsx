import Lightbox  from 'yet-another-react-lightbox';
import Video     from 'yet-another-react-lightbox/plugins/video';
import Captions  from 'yet-another-react-lightbox/plugins/captions';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

export default function Gallery({ items, onClose }) {
  return (
    <Lightbox
      open
      close={onClose}
      slides={items}
      plugins={[Video, Captions]}
      captions={{
        titleText:       'title',        // key to use for title
        descriptionText: 'description',  // key to use for description
        descriptionTextAlign: 'center',  // or 'start' / 'end'
      }}
      styles={{
        title:       { fontFamily: 'VT323, monospace', fontSize: '26px' },
        description: { fontFamily: 'VT323, monospace', fontSize: '18px' },
        container:   { backgroundColor: 'rgba(0,0,0,0.9)' },
      }}
    />
  );
}
