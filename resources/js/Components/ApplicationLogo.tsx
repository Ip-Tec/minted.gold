export default function ApplicationLogo(
    props: React.ImgHTMLAttributes<HTMLImageElement>
) {
    return (
        <img
            src="/image/mgj.png"
            alt="Application Logo"
            width={100}
            height={100}
            {...props}
        />
    );
}
