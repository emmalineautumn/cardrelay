import { CardRenderer } from "./cardRenderer";

interface IProps {
  idx: number;
  cardHeight: number;
  bleed: number;
  cardWidth: number;
  margin: number;
  frontImage: ImageInfo | undefined;
  ppi: number;
  frontBleedType: BleedType;
  frontBleedColor: string;
  backImage: ImageInfo | undefined;
  backBleedType: BleedType;
  backBleedColor: string;
}

export function CardRow(
  {
    idx,

    cardHeight,
    bleed,
    cardWidth,
    margin,
    frontImage,
    ppi,
    frontBleedType,
    frontBleedColor,
    backImage,
    backBleedType,
    backBleedColor,
  }: IProps,
) {
  return (
    <div className="flex justify-between">
      <Card
        cardHeight={cardHeight}
        bleed={bleed}
        cardWidth={cardWidth}
        image={frontImage}
        ppi={ppi}
        idx={idx}
        bleedType={frontBleedType}
        bleedColor={frontBleedColor}
        margin={margin}
        flip={1}
      />
      <div className="border border-b-0 border-dashed border-black">
      </div>
      <Card
        cardHeight={cardHeight}
        bleed={bleed}
        cardWidth={cardWidth}
        image={backImage}
        ppi={ppi}
        idx={idx}
        bleedType={backBleedType}
        bleedColor={backBleedColor}
        margin={margin}
        flip={-1}
      />
    </div>
  );
}

interface ICardProps {
  cardHeight: number;
  bleed: number;
  cardWidth: number;
  image: ImageInfo | undefined;
  ppi: number;
  idx: number;
  bleedType: BleedType;
  bleedColor: string;
  margin: number;
  flip: 1 | -1;
}

function Card(
  {
    cardHeight,
    bleed,
    cardWidth,
    image,
    ppi,
    idx,
    bleedType: backBleedType,
    bleedColor: backBleedColor,
    margin,
    flip,
  }: ICardProps,
) {
  return (
    <div
      className=" relative border-red-300"
      // Bear in mind that cards are rotated, width and height are swapped
      style={{
        width: (cardHeight + (2 * bleed)) + "in",
        // height: (cardWidth + (2 * bleed)) + "in",
        // height: "min-content",
      }}
    >
      {!!image && (
        <CardRenderer
          image={image.image}
          height={cardWidth}
          width={cardHeight}
          ppi={ppi}
          imageHeight={image.cardHeight}
          imageWidth={image.cardWidth}
          cardPosX={!image.uniqueBack && image.type === "back"
            ? 0
            : idx % 100 % image.numWidth}
          cardPosY={!image.uniqueBack && image.type === "back"
            ? 0
            : Math.floor(idx % 100 / image.numWidth)}
          flip={flip}
          bleed={bleed}
          bleedType={backBleedType}
          bleedColor={backBleedType === "solid" ? backBleedColor : undefined}
        >
        </CardRenderer>
      )}
      <div
        className="absolute z-10 border-t border-r border-black"
        style={{
          bottom: -(margin - bleed) + "in",
          left: -(margin - bleed) + "in",
          width: margin + "in",
          height: margin + "in",
        }}
      >
      </div>
      <div
        className="absolute z-10 border-t border-l border-black"
        style={{
          bottom: -(margin - bleed) + "in",
          right: -(margin - bleed) + "in",
          width: margin + "in",
          height: margin + "in",
        }}
      >
      </div>
      <div
        className="absolute z-10 border-b border-l border-black"
        style={{
          top: -(margin - bleed) + "in",
          right: -(margin - bleed) + "in",
          width: margin + "in",
          height: margin + "in",
        }}
      >
      </div>
      <div
        className="absolute z-10 border-b border-r border-black"
        style={{
          top: -(margin - bleed) + "in",
          left: -(margin - bleed) + "in",
          width: margin + "in",
          height: margin + "in",
        }}
      >
      </div>
    </div>
  );
}