import { css } from '@emotion/react';
import { RiCloseLine } from 'react-icons/ri';

import Button from '@/components/common/buttons/Button';
import SelectBox from '@/components/common/SelectBox';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { CATEGORY_OPTIONS, INITIAL_FORM_STATE } from '@/constants/playlist';
import { usePlaylistForm } from '@/hooks/usePlaylistForm';
import theme from '@/styles/theme';
import { PlaylistFormDataModel } from '@/types/playlist';

interface PlaylistFormProps {
  initialData?: Partial<PlaylistFormDataModel>;
  onSubmit: (data: PlaylistFormDataModel) => void;
}
const PlaylistForm: React.FC<PlaylistFormProps> = ({ initialData = {}, onSubmit }) => {
  const {
    titleValue,
    categoryValue,
    previewImage,
    isToggled,
    titleInputRef,
    fileInputRef,
    textAreaRef,
    handleCategoryChange,
    handleFileChange,
    handleFileButtonClick,
    handleRemoveImage,
    handleTitleChange,
    handleSubmitForm,
    toggle,
  } = usePlaylistForm({ ...INITIAL_FORM_STATE, ...initialData, videos: [] });

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = handleSubmitForm(event);
    onSubmit(data);
  };

  return (
    <div css={containerStyle}>
      <form onSubmit={onFormSubmit}>
        <input
          type='text'
          name='title'
          css={inputStyle}
          placeholder='새로운 재생목록 이름 입력하세요 (최대 50자)'
          value={titleValue}
          onChange={handleTitleChange}
          ref={titleInputRef}
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
            items={CATEGORY_OPTIONS}
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
