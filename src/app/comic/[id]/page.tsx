import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ComicViewer } from "@/components/comic/ComicViewer";
import { CommentSection } from "@/components/comic/CommentSection";
import { RelatedComics } from "@/components/comic/RelatedComics";
import { UserInfo } from "@/components/comic/UserInfo";
import { ChevronLeft } from "lucide-react";

// Mock data for a comic
const mockComic = {
  id: "1",
  title: "TITLE GOES HERE",
  description: "Description goes here",
  likes: 102,
  comments: 45,
  views: 102,
  imageSrc: "/images/comic-panel.jpg",
  username: "USERNAME",
  gameName: "GAME NAME",
  gameLevel: 1,
  avatarSrc: "/images/profile.jpg",
};

// Mock data for comments
const mockComments = [
  {
    username: "USERNAME",
    content: "I love this",
    date: "April 23, 2025",
    avatarSrc: "/images/profile.jpg",
  },
  {
    username: "USERNAME",
    content: "I love this",
    date: "April 23, 2025",
    avatarSrc: "/images/profile.jpg",
  },
  {
    username: "USERNAME",
    content: "I love this",
    date: "April 23, 2025",
    avatarSrc: "/images/profile.jpg",
  },
  {
    username: "USERNAME",
    content: "I love this",
    date: "April 23, 2025",
    avatarSrc: "/images/profile.jpg",
  },
];

// Mock data for related comics
const mockRelatedComics = [
  {
    id: "2",
    title: "TITLE OF THE COMIC GOES HERE",
    gameName: "Game name",
    likes: 102,
    comments: 45,
    imageSrc: "/images/comic-panel.jpg",
  },
  {
    id: "3",
    title: "TITLE OF THE COMIC GOES HERE",
    gameName: "Game name",
    likes: 102,
    comments: 45,
    imageSrc: "/images/comic-panel.jpg",
  },
  {
    id: "4",
    title: "TITLE OF THE COMIC GOES HERE",
    gameName: "Game name",
    likes: 102,
    comments: 45,
    imageSrc: "/images/comic-panel.jpg",
  },
];

interface ComicPageParams {
  id: string;
}

export default function ComicDetailPage({ params }: { params: ComicPageParams }) {
  // In a real app, you would fetch the comic data based on the ID
  const comicId = params.id;

  return (
    <SiteLayout>
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
          <ChevronLeft className="w-5 h-5 mr-1" />
          GO BACK
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ComicViewer
            title={mockComic.title}
            description={mockComic.description}
            likes={mockComic.likes}
            comments={mockComic.comments}
            views={mockComic.views}
            imageSrc={mockComic.imageSrc}
          />

          <CommentSection comments={mockComments} />
        </div>

        <div className="md:col-span-1">
          <UserInfo
            username={mockComic.username}
            gameName={mockComic.gameName}
            gameLevel={mockComic.gameLevel}
            avatarSrc={mockComic.avatarSrc}
          />

          <RelatedComics comics={mockRelatedComics} />
        </div>
      </div>
    </SiteLayout>
  );
}
