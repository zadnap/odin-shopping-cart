import styles from './CheckoutForm.module.scss';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function CheckoutForm({ summary, paymentMethods }) {
  return (
    <form className={styles.checkoutForm}>
      <section className={styles.coupon}>
        <h2 className={styles.title}>Coupon Code</h2>
        <Input
          icon={faPaperPlane}
          placeholder="Enter your code"
          name="Coupon Code"
        />
        <Button type="button">Apply Coupon</Button>
      </section>
      <section className={styles.summary}>
        <h2 className={styles.title}>Order Summary</h2>
        <dl>
          {summary.map(
            (item) =>
              item.value !== 0 && (
                <div key={item.title} className={styles.pair}>
                  <dt>{item.title}</dt>
                  <dd>
                    {!item.isPositive && '-'}${item.value.toFixed(2)}
                  </dd>
                </div>
              )
          )}
          <div className={styles.pair}>
            <dt>Total</dt>
            <dd>
              $
              {summary
                .reduce(
                  (acc, curr) =>
                    curr.isPositive ? acc + curr.value : acc - curr.value,
                  0
                )
                .toFixed(2)}
            </dd>
          </div>
        </dl>
      </section>
      <section className={styles.payment}>
        <h2 className={styles.title}>Payment</h2>
        <fieldset className={styles.paymentOptions}>
          <legend className="sr-only">Choose a payment method</legend>
          <ul className={styles.methodList}>
            {paymentMethods.map((method, index) => (
              <li className={styles.item} key={method.name}>
                <input
                  className={styles.optionInput}
                  type="radio"
                  name="payment"
                  id={method.name}
                  defaultChecked={index === 0}
                  aria-label={method.name}
                />
                <label
                  className={styles.optionLabel}
                  htmlFor={method.name}
                  title={method.name}
                >
                  <FontAwesomeIcon icon={method.icon} />
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <Button>Check Out</Button>
      </section>
    </form>
  );
}

export default CheckoutForm;
