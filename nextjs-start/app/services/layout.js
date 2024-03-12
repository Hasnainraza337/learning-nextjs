import ServiceFooter from "../(components)/ServiceFooter/page";

export default function ServiceLayout({ children }) {
    return (
        <div>
            {children}
            <ServiceFooter />
        </div>
    )
}
