import * as React from 'react';
import {HelperText, TextInput} from 'react-native-paper';

type IProps = React.ComponentProps<typeof TextInput> & {
  onInputChange: (text: string, name: string) => void;
  name: string;
  error?: boolean;
  errorMessage?: string;
};

const TextInputBox: React.FC<IProps> = ({
  value,
  onInputChange,
  label,
  name,
  error = false,
  errorMessage = '',
  ...props
}) => {
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    setText(() => value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={text}
        onChangeText={val => {
          setText(() => val);
          onInputChange(val, name);
        }}
        {...props}
      />
      {error ? (
        <HelperText type="error" visible={error}>
          {errorMessage}
        </HelperText>
      ) : null}
    </>
  );
};

export default TextInputBox;
