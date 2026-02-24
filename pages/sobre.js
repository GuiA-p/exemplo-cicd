import NextLink from "next/link";

export default function HomeScreen() {
    return (
        <div>
            <h1>Sobre</h1>
            <NextLink href='/'>
                Voltar
            </NextLink>
        </div>
    )

}