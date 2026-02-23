// import { 헤더 } from "@/widgets/헤더";
// import { 푸터 } from "@/widgets/푸터";
// import { 그레이 아이콘 } from "@/assets/icons/그레이 아이콘";
// import { 팔로우버튼 } from "@/shared/ui/버튼";
// import { 텍스트카드 } from "@/widgets/text 카드";
// import { 게시글 리스트 } from "@/widgets/post 리스트";
import { TopMainNav } from '@/widgets/top-main-nav';

export function FeedPage() {

const HaveFollwers = true; 
// 팔로워 api를 부르고, 팔로워가 있으면 true, 없으면 false로 바꿔주면 됩니다.

  return (
    <>
      <TopMainNav title='얄약마켓 피드'/>
      {HaveFollwers ? (
        <main className="mx-auto max-w-5xl">
          {/* <텍스트카드 />
          <게시글 리스트 /> */}
        </main>
      ) : (
        <main className="mx-auto max-w-5xl flex flex-col items-center justify-center h-screen">
          <p className="text-gray-500 text-lg">팔로우하는 사용자가 없습니다. 관심있는 사용자를 팔로우 해보세요!</p>
        </main>
      )}
    </>
  );
}