import React, { forwardRef } from 'react';
import type { BottomSheetProps as BaseBottomSheetProps } from 'react-spring-bottom-sheet';
import { BottomSheet as BaseBottomSheet } from 'react-spring-bottom-sheet';
import type { RefHandles } from 'react-spring-bottom-sheet/dist/types';

import 'react-spring-bottom-sheet/dist/style.css';
import './style.css';

export interface BottomSheetProps extends BaseBottomSheetProps {
  HeaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
}

export const BottomSheet = forwardRef<RefHandles, BottomSheetProps>(
  (
    { open, onDismiss, HeaderComponent, FooterComponent, children, ...props }: BottomSheetProps,
    ref,
  ) => {
    return (
      <BaseBottomSheet
        {...props}
        ref={ref}
        open={open}
        onDismiss={onDismiss}
        expandOnContentDrag
        header={HeaderComponent}
        footer={FooterComponent}
      >
        {children}
      </BaseBottomSheet>
    );
  },
);
BottomSheet.displayName = 'BottomSheet';
