export interface GalleryCard {
  id: number;
  content: string;
  className: string;
  thumbnail: string;
}

export const universityCards: GalleryCard[] = [
  {
    id: 1,
    content: "",
    className: "md:col-span-2 bg-center bg-cover",
    thumbnail: "/up/photo1.jpg",
  },
  {
    id: 2,
    content: "",
    className: "col-span-1",
    thumbnail: "/up/photo2.jpg",
  },
  {
    id: 3,
    content: "",
    className: "col-span-1",
    thumbnail: "/up/photo3.jpg",
  },
  {
    id: 4,
    content: "",
    className: "md:col-span-2",
    thumbnail: "/up/photo4.jpg",
  },
];

export const telkomCards: GalleryCard[] = [
  {
    id: 1,
    content: "",
    className: "md:col-span-2",
    thumbnail: "/telkom/photo1.jpg",
  },
  {
    id: 2,
    content: "",
    className: "col-span-1",
    thumbnail: "/telkom/photo2.jpg",
  },
  {
    id: 3,
    content: "",
    className: "col-span-1",
    thumbnail: "/telkom/photo3.jpg",
  },
  {
    id: 4,
    content: "",
    className: "md:col-span-2",
    thumbnail: "/telkom/photo4.jpg",
  },
];

export const hrAcademyCards: GalleryCard[] = [
  {
    id: 1,
    content: "",
    className: "md:col-span-1",
    thumbnail: "/hracademy/photo1.jpg",
  },
  {
    id: 2,
    content: "",
    className: "col-span-2 row-span-2",
    thumbnail: "/hracademy/photo2.png",
  },
  {
    id: 3,
    content: "",
    className: "md:col-span-1",
    thumbnail: "/hracademy/photo3.jpg",
  },
  // {
  //   id: 4,
  //   content: "",
  //   className: "md:col-span-2",
  //   thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
  // },
];
