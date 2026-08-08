import { useImages } from "@/contexts";

export function SvgImages() {
  const { images } = useImages();

  return (
    <g id="svg-images-layer">
      {images.map((img) => {
        const cx = img.x + img.width / 2;
        const cy = img.y + img.height / 2;
        
        return (
          <g key={img.id} transform={`rotate(${img.rotation} ${cx} ${cy})`}>
            {img.borderRadius > 0 ? (
              <>
                <clipPath id={`clip-${img.id}`}>
                  <rect 
                    x={img.x} 
                    y={img.y} 
                    width={img.width} 
                    height={img.height} 
                    rx={img.borderRadius} 
                    ry={img.borderRadius} 
                  />
                </clipPath>
                <image
                  href={img.url}
                  x={img.x}
                  y={img.y}
                  width={img.width}
                  height={img.height}
                  preserveAspectRatio="none"
                  clipPath={`url(#clip-${img.id})`}
                  opacity={img.opacity}
                  pointerEvents="none"
                />
              </>
            ) : (
              <image
                href={img.url}
                x={img.x}
                y={img.y}
                width={img.width}
                height={img.height}
                preserveAspectRatio="none"
                opacity={img.opacity}
                pointerEvents="none"
              />
            )}
          </g>
        );
      })}
    </g>
  );
}
