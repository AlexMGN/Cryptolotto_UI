import { useEffect } from 'react'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import useNotificationStore from '../stores/useNotificationStore'
import success from '../../public/success.gif';

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  )

  const reversedNotifications = [...notifications].reverse()

  return (
    <div
      className={`z-20 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6`}
    >
      <div className={`flex flex-col w-screen`}>
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

const Notification = ({ type, message, description, txid, onHide }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      onHide()
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [onHide]);

  return (
    <div
      id="notify"
      className={`max-w-lg w-full bg-bkg-1 shadow-lg rounded-md mt-2 pointer-events-auto ring-1 ring-black ring-opacity-5 p-2 mx-4 mb-12 overflow-hidden bg-white text-primary border border-primary`}
    >
      <div className={`p-4`}>
        <div className={`flex items-center`}>
          <div className={`flex-shrink-0`}>
            {type === 'success' ? (
              <img className={`w-14 h-14 mr-1`} src={success.src} alt=""/>
              ) : null}
            {type === 'info' && <InformationCircleIcon className={`h-8 w-8 mr-1 text-red`} />}
            {type === 'error' && (
              <XCircleIcon className={`h-8 w-8 mr-1`} />
            )}
          </div>
          <div className={`ml-2 w-0 flex-1`}>
            <div className={`font-bold text-fgd-1`}>
              {
                message
              }
            </div>
            {description ? (
              <p className={`mt-0.5 text-sm text-fgd-2`}>{description}</p>
            ) : null}
            {txid ? (
              <div className="flex flex-row">
                <a
                  href={'https://solscan.io//tx/' + txid + `?cluster=devnet`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-row link link-accent"
                >
                  <div className="flex">{txid.slice(0, 8)}...
                    {txid.slice(txid.length - 8)}
                  </div>
                </a>
              </div>
            ) : null}
          </div>
          <div className={`ml-4 flex-shrink-0 self-start flex`}>
            <button
              onClick={() => onHide()}
              className={`bg-bkg-2 default-transition rounded-md inline-flex text-fgd-3 hover:text-fgd-4 focus:outline-none`}
            >
              <span className={`sr-only`}>Close</span>
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationList
