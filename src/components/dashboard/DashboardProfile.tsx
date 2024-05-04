
export type DashboardProfileProps = {
    image: string;
  fullName: string;
  email: string;
}

export default function DashboardProfile(props: DashboardProfileProps) {
    return (
        <div className="flex flex-col gap-2 items-center py-4">
        <img
          src={props.image}
          alt=""
          className="rounded-full size-16 object-ccover"
        />
        <p className="font-semibold text-title">{props.fullName}</p>
        <p className="">{props.email}</p>
      </div>
    );
}