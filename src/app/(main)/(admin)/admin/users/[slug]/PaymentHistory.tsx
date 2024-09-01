import { ListGroup } from "@/components/admin";
import AppIcons from "@/components/AppIcons";
import SmallComponents from "@/components/SmallComponents";
import { formatNumber } from "@/functions/helpers";
import { dummyPayment } from "@/utils/dummy";
import { Payment } from "@/utils/types/payment";

export default function PaymentHistory({userId}:{userId: string}) {
    const payments = [dummyPayment, dummyPayment]
    
    return (
        <ListGroup
            title="Payment History"
            className="col-span-1"
        >
            {
                payments.map(item => <Card key={item._id} {...item} />)
            }
        </ListGroup>
    );
}

function Card({ date, plan: duration, active: isActive, amount }: Payment) {

    return (
        <div className="flex justify-stretch items-start gap-3 py-1" >
            <AppIcons.RoundPayment />
            <div>
                <h3 className="font-bold text-black-400 text-label line-clamp-1">{duration} subscription - {formatNumber(Number(amount), true)}</h3>
                <h4 className="font-semibold text-black-300 text-label line-clamp-1">{date}</h4>
                <p>
                    {
                        isActive ? <SmallComponents.ActivePayment />
                            : <SmallComponents.EndedPayment />

                    }
                </p>
            </div>
        </div>
    )
}