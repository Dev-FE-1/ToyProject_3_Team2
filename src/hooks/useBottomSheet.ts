import { useState } from 'react';

const useBottomSheet = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetContentType, setBottomSheetContentType] = useState<
    'deleteFromPlaylist' | 'deleteVideo'
  >('deleteFromPlaylist');

  const onClickKebob = () => {
    setBottomSheetContentType('deleteFromPlaylist');
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  return {
    isBottomSheetOpen,
    bottomSheetContentType,
    onClickKebob,
    handleBottomSheetClose,
    setBottomSheetContentType,
    setIsBottomSheetOpen,
  };
};

export default useBottomSheet;
