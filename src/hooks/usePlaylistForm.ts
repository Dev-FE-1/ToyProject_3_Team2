import { useEffect, useRef, useState } from 'react';

import { INITIAL_FORM_STATE } from '@/constants/playlist';
import { useToggleStore } from '@/store/useToggleStore';
import { PlaylistFormDataModel } from '@/types/playlist';

export const usePlaylistForm = (initialData = INITIAL_FORM_STATE) => {
  const isToggled = useToggleStore((state) => state.isToggled); // isPublic
  const toggle = useToggleStore((state) => state.toggle);
  const [titleValue, setTitleValue] = useState(initialData.title);
  const [categoryValue, setCategoryValue] = useState<string | undefined>(initialData.category);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.thumbnailUrl);
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
  }, [initialData.description]);

  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
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
      likeCount: initialData.likeCount,
      forkCount: initialData.forkCount,
      commentCount: initialData.commentCount,
      videoCount: initialData.videoCount,
      thumbnailUrl: previewImage ?? '',
      isPublic: isToggled,
      videos: initialData.videos,
    };
    return data;
  };

  return {
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
  };
};
