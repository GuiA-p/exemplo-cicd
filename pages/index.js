import NextLink from "next/link";

export default function HomeScreen() {
    return(
        <div>
            <h1>Pagina Inicial</h1>
            <NextLink href='/sobre'>
                Sobre
            </NextLink>
        </div>
    )

}