import { useNavigate } from 'react-router-dom';

import { addComment } from '@/api/endpoints/comment';
import { getUserData } from '@/api/endpoints/user';
import CommentForm from '@/components/commentForm/CommentForm';
import { PATH } from '@/constants/path';
import { useToastStore } from '@/store/useToastStore';

const CommentAdd = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (commentData: { playlistId: string; content: string }) => {
    try {
      const userSessionStr = sessionStorage.getItem('userSession');
      const userSession = userSessionStr ? JSON.parse(userSessionStr) : null;

      if (!userSession?.uid) {
        throw new Error('유효한 사용자 ID가 없습니다.');
      }

      const user = await getUserData(userSession.uid);

      // 유저 데이터가 없는 경우 기본값
      const userName = user?.userName || 'null';
      const profileImg = user?.profileImg || '';

      if (!commentData.playlistId || !userName || !commentData.content) {
        throw new Error('필수 데이터가 누락되었습니다.');
      }

      await addComment(
        commentData.playlistId,
        userSession.uid,
        userName,
        profileImg,
        commentData.content
      );

      navigate(`${PATH.COMMENT.replace(':playlistId', commentData.playlistId)}`, {
        state: { toastMessage: '댓글이 추가되었습니다.', refetchComments: true },
      });
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
      showToast('댓글 추가에 실패했습니다.');
    }
  };

  return (
    <div>
      <CommentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CommentAdd;
