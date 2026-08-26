import css from "./Balance.module.css";
import { useAppSelector } from "../../redux/hooks";

const Balance: React.FC = () => {
  const amount = useAppSelector((state) => state.session.balance).toFixed(2);
  return (
    <div className={css.container}>
      <h4 className={css.title}>your balance</h4>
      <div className={css.balance}>₴ <span className={css.amount}>{amount}</span></div>
    </div>
  );
};

export default Balance;
