import React, {FC} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ScrollViewProps,
  ViewProps,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import theme from '../config/theme';

enum BehaviorType {
  HEIGHT = 'height',
  PADDING = 'padding',
}

const behavior = Platform.select({
  ios: BehaviorType.PADDING,
  android: BehaviorType.HEIGHT,
});

const {COLOR, FONT} = theme;

type Props = {
  scrollViewProps?: ScrollViewProps;
  viewProps?: ViewProps;
  snackbarProps?: {
    duration?: number;
    onDismiss: () => void;
    message: string;
  };
  disableScrollView?: boolean;
  children: React.ReactNode;
};

const Content: FC<Props> = ({
  children,
  disableScrollView,
  viewProps,
  scrollViewProps,
}) => {
  if (disableScrollView) {
    return (
      <View {...viewProps} style={[styles.view, viewProps?.style]}>
        {children}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={44}
      style={styles.container}>
      <ScrollView
        onScrollBeginDrag={() => Keyboard.dismiss()}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...scrollViewProps}>
        <View {...viewProps} style={[styles.view, viewProps?.style]}>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Screen: FC<Props> = props => {
  const {children, snackbarProps, ...rest} = props;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => console.log('click')}>
        <Content {...rest}>{children}</Content>
      </TouchableWithoutFeedback>
      <Snackbar
        visible={!!snackbarProps?.message || false}
        duration={snackbarProps?.duration || 3000}
        style={{marginBottom: 24}}
        onDismiss={() => snackbarProps?.onDismiss()}>
        <Text style={styles.snackbarText}>{snackbarProps?.message}</Text>
      </Snackbar>
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
  view: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flex: 1,
  },
  snackbarText: {
    ...FONT.body2,
    color: COLOR.white,
  },
});
