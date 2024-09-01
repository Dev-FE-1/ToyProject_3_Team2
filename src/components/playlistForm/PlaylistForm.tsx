import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { RiCloseLine } from 'react-icons/ri';

import Button from '@/components/common/buttons/Button';
import SelectBox from '@/components/common/SelectBox';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { Video } from '@/mock/data';
import { useToggleStore } from '@/store/useToggleStore';
import theme from '@/styles/theme';
import { PlaylistFormDataModel } from '@/types/playlist';

const options = [
  { value: 'lecture', label: '강의' },
  { value: 'animal', label: '동물' },
  { value: 'life', label: '라이프' },
  { value: 'travel', label: '여행' },
  { value: 'movie', label: '영화' },
  { value: 'entertainment', label: '엔터테인먼트' },
  { value: 'music', label: '음악' },
  { value: 'kids', label: '키즈' },
];

interface PlaylistFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialCategory?: string;
  initialCreatedAt?: string;
  initialUpdatedAt?: string;
  initialLikeCount?: number;
  initialForkCount?: number;
  initialCommentCount?: number;
  initialVideoCount?: number;
  initialThumbnailUrl?: string;
  initialIsPublic?: boolean;
  initialVideos?: Video[];
  onSubmit: (data: PlaylistFormDataModel) => void;
}
const PlaylistForm: React.FC<PlaylistFormProps> = ({
  initialTitle = '',
  initialDescription = '',
  initialCategory = '',
  initialCreatedAt = '',
  initialUpdatedAt = '',
  initialLikeCount = 0,
  initialForkCount = 0,
  initialCommentCount = 0,
  initialVideoCount = 0,
  initialThumbnailUrl = '',
  initialIsPublic = false,
  initialVideos = [],
  onSubmit,
}: PlaylistFormProps) => {
  const isToggled = useToggleStore((state) => state.isToggled); // isPublic
  const toggle = useToggleStore((state) => state.toggle);
  const [titleValue, setTitleValue] = useState(initialTitle);
  const [categoryValue, setCategoryValue] = useState<string | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = '';
    }
  }, []);
  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
    // 여기서 서버로 데이터 전송
    // 예시) sendDataToServer(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // 미리보기 이미지 보여주기
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일입력 초기화
    }
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };
  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const { title, category } = Object.fromEntries(formData.entries()) as {
      title: string;
      category: string;
    };
    const data: PlaylistFormDataModel = {
      title,
      description: textAreaRef.current?.value || '',
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likeCount: 0,
      forkCount: 0,
      commentCount: 0,
      videoCount: 0,
      thumbnailUrl: previewImage ?? '',
      isPublic: isToggled,
      videos: [],
    };
    console.log(data);
    onSubmit(data);
  };
  return (
    <div css={containerStyle}>
      <form onSubmit={handleSubmitForm}>
        <input
          type='text'
          name='title'
          css={inputStyle}
          placeholder='새로운 재생목록 이름 입력하세요 (최대 50자)'
          value={titleValue}
          onChange={handleTitleChange}
        />
        <div css={divContainerStyle}>
          <span>썸네일(대표이미지)</span>
          <Button size='small' customStyle={fileButtonStyle} onClick={handleFileButtonClick}>
            파일 추가
          </Button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='image/*'
            style={{ display: 'none' }}
          />
        </div>
        <div css={previewContainerStyle}>
          {previewImage ? (
            <div>
              <img src={previewImage} alt='preview' />
              <button onClick={handleRemoveImage} css={removeButtonStyle}>
                <RiCloseLine />
              </button>
            </div>
          ) : (
            <div css={defaultTextStyle}>
              <h2>미리보기</h2>
              <span>나만의 재생목록을 나타내는</span>
              <span>이미지를 설정해주세요</span>
            </div>
          )}
        </div>
        <div css={divContainerStyle}>
          <span>공개여부</span>
          <ToggleSwitch checked={isToggled} onCheckedChange={toggle} />
        </div>
        <div css={divContainerStyle}>
          <span>카테고리</span>
          <SelectBox
            items={options}
            onChange={handleCategoryChange}
            value={categoryValue}
            name='category'
          />
        </div>
        <textarea ref={textAreaRef} css={textareaStyle} placeholder='설명을 입력하세요.' />
        <div css={buttonStyle}>
          <Button type='submit' styleType={`${!titleValue.trim() ? 'disabled' : 'primary'}`}>
            만들기
          </Button>
        </div>
      </form>
    </div>
  );
};
const containerStyle = css`
  padding: 0 1rem 90px;
  color: ${theme.colors.white};
`;
const inputStyle = css`
  width: 100%;
  padding: 20px 12px 24px;
  border: 0;
  outline: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xlarge};
  background-color: transparent;
  font-weight: 500;
`;
const previewContainerStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px auto;
  width: 200px;
  height: 200px;
  border: 1px dashed ${theme.colors.white};
  overflow: hidden;
  background-color: ${theme.colors.tertiary + '5a'};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const removeButtonStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};

  width: 32px;
  height: 32px;
  cursor: pointer;
  svg {
    font-size: 32px;
    stroke-width: 0.2;
  }
`;
const defaultTextStyle = css`
  text-align: center;
  h2 {
    font-size: ${theme.fontSizes.large};
    margin-bottom: 12px;
  }
  span {
    display: block;
    line-height: 1.5;
    font-size: ${theme.fontSizes.normal};
    padding: 0 16px;
  }
`;
const divContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 12px;

  > span {
    font-size: ${theme.fontSizes.large};
  }
`;
const fileButtonStyle = css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
`;

const textareaStyle = css`
  width: 100%;
  height: 140px;
  padding: 12px;
  margin: 1rem 0 24px;
  border: 1px solid ${theme.colors.white};
  background-color: transparent;
  color: ${theme.colors.white};
  outline: none;
  font-size: ${theme.fontSizes.large};
  border-radius: 4px;
  resize: none;
`;
const buttonStyle = css`
  button {
    font-size: ${theme.fontSizes.large};
  }
  button:first-of-type {
    margin-bottom: 8px;
  }
`;
export default PlaylistForm;
