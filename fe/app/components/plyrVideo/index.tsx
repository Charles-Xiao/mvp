import React from 'react';

interface PlyrVideoProps {
  posterUrl?: string;
  sources?: {
    src: string;
    type: string;
    size?: string | number;
  }[];
  captions?: {
    label: string;
    srcLang: string;
    src: string;
    default?: boolean;
  }[];
  fallbackDownloadUrl?: string;
}

const PlyrVideo: React.FC<PlyrVideoProps> = ({
  posterUrl = "https://mvp-bkt.bj.bcebos.com/public/%E6%B3%A2%E5%AF%86.png",
  sources = [
    {
      src: "https://mvp-bkt.cdn.bcebos.com/public/%E6%B3%A2%E5%AF%86%E5%8D%B0%E8%B1%A1-%E5%B1%B1%E6%B0%B4%E7%A5%9E%E9%9F%B5.MP4",
      type: "video/mp4",
      size: "720"
    },
    {
      src: "https://mvp-bkt.cdn.bcebos.com/public/%E6%B3%A2%E5%AF%86%E5%8D%B0%E8%B1%A1-%E5%B1%B1%E6%B0%B4%E7%A5%9E%E9%9F%B5.MP4", 
      type: "video/mp4",
      size: "1080"
    }
  ],
  // captions = [
  //   {
  //     label: "English",
  //     srcLang: "en",
  //     src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt",
  //     default: true
  //   },
  //   {
  //     label: "Français",
  //     srcLang: "fr", 
  //     src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
  //   }
  // ],
  fallbackDownloadUrl = "https://mvp-bkt.cdn.bcebos.com/public/%E6%B3%A2%E5%AF%86%E5%8D%B0%E8%B1%A1-%E5%B1%B1%E6%B0%B4%E7%A5%9E%E9%9F%B5.MP4"
}) => {
  return (
    <div className="flex justify-center items-center mt-12 mb-12">
      <div className="w-1/2">
        <video className="w-full object-contain" controls crossOrigin="anonymous" playsInline poster={posterUrl}>
          {sources.map((source, index) => (
            <source
              key={index}
              src={source.src}
              type={source.type}
              sizes={source.size?.toString()}
            />
          ))}

          {/* {captions.map((caption, index) => (
            <track
              key={index}
              kind="captions"
              label={caption.label}
              srcLang={caption.srcLang}
              src={caption.src}
              default={caption.default}
            />
          ))} */}

          {/* Fallback for browsers that don't support the <video> element */}
          <a href={fallbackDownloadUrl} download>Download</a>
        </video>
      </div>
    </div>
  );
};

export default PlyrVideo;
