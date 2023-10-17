import Image from 'next/image';

interface Props {
  isGameWon: boolean;
  isGameOver: boolean;
  isMouseDown: boolean;
}

const Sailor = (props: Props) => {
  const { isGameWon, isGameOver, isMouseDown } = props;

  if (isGameWon) {
    return (
      <Image
        src="/sailor-win.svg"
        alt="sailor with eyepatch sunglasses"
        height={64}
        width={64}
      />
    );
  }

  if (isGameOver) {
    return (
      <Image src="/sailor-dead.svg" alt="Dead sailor" height={64} width={64} />
    );
  }

  if (isMouseDown) {
    return (
      <Image
        src="/sailor-surprised.svg"
        alt="sailor with surprised expression"
        height={64}
        width={64}
      />
    );
  }

  return (
    <Image
      priority
      src="/sailor-default.svg"
      alt="sailor"
      height={64}
      width={64}
    />
  );
};

export default Sailor;
