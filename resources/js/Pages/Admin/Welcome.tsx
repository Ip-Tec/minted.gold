import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            {/* <Authenticated user={auth.user}> */}
                <Head title="Welcome" />
            {/* </Authenticated> */}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, similique temporibus quis veniam excepturi, eum ullam odit itaque voluptate amet, eveniet illum dicta impedit reprehenderit hic sint necessitatibus. Asperiores, minima!
            Corporis numquam rem ab reprehenderit non ea autem saepe repudiandae tempora, provident explicabo consequatur cum quidem facere excepturi deleniti iste accusamus quas perspiciatis! Et cupiditate facilis illum voluptatum earum officiis.
            Praesentium minus, cum optio velit tenetur ex delectus vero, architecto doloremque eveniet ipsa! Autem necessitatibus labore ipsa sint itaque tenetur repudiandae. Praesentium nisi maiores molestias esse consequuntur repudiandae, tenetur aliquam!
            Iusto, eveniet? Non fugiat suscipit saepe, expedita quaerat debitis. Beatae quisquam, natus, doloribus voluptas quas molestias obcaecati, quidem odit amet ab voluptatum aliquam sapiente tempore vitae necessitatibus! Nam, blanditiis aliquam!
            Nesciunt numquam adipisci, blanditiis eveniet dolorum atque nobis totam, odit nam natus assumenda? Libero modi, repellat, cum voluptas error magnam nihil cumque ex laboriosam, sunt eos ullam iure qui consequatur?</p>
        </>
    );
}
