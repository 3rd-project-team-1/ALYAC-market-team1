// import { 헤더 } from "@/widgets/헤더";
// import { 푸터 } from "@/widgets/푸터";
// import { 그레이 아이콘 } from "@/assets/icons/그레이 아이콘";
// import { 팔로우버튼 } from "@/shared/ui/버튼";
// import { 텍스트카드 } from "@/widgets/text 카드";
// import { 게시글 리스트 } from "@/widgets/post 리스트";
import { TopMainNav } from '@/widgets/top-main-nav';

export function FeedPage() {
  // return (
  //   if (isNoHavefollowers) {
  //     <div>
  //       <그레이 아이콘/>
  //       <p className='text-gray-500'>팔로우하는 사용자가 없습니다.</p>
  //       <팔로우버튼>팔로우하기</팔로우버튼>
  //     </div>
  //   })
  //   }

  return (
    <div>
      <TopMainNav title="알약마켓 피드" />
      <main className="mx-auto max-w-5xl">
        {/* <텍스트카드 />
        <게시글 리스트 /> */}
      </main>
    </div>
  );
}
