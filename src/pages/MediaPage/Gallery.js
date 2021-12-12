import React from "react";
import { Card, Image } from "antd";
import moment from "moment";

const { Meta } = Card;

function Gallery({ images }) {
  return (
    <div className="px-4 h-full flex gap-2">
      {/* <h1>Gallery</h1> */}
      {images.map((image) => (
        <Card
          //
          size="small"
          style={{ width: 180 }}
          className="cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ease-out"
          cover={
            <Image
              height={200}
              src={image.url}
              preview={false}
              placeholder={
                <Image
                  preview={false}
                  src={`${image.url}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                />
              }
            />
          }
          onClick={() => window.open(image.url, "_blank")}
        >
          <Meta
            // className="py-0"
            style={{ paddingTop: 0, paddingBottom: 0 }}
            title={moment(new Date(image?.timestamp?.toDate())).format(
              "MMMM D, YYYY"
            )}
          />
        </Card>
      ))}
    </div>
  );
}

export default Gallery;
