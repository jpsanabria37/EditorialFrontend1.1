export async function getTipoDocumentos() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/TipoDocumento`,{
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        },
    });
    const data = await response.json();
    return data.Data || [];
}

export async function getCategoriaVehiculos() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/CategoriaVehiculo`,{
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        },
    });
    const data = await response.json();
    return data.Data || [];
}

export async function getMarcas() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Marca`,{
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        },
    });
    const data = await response.json();
    return data.Data || [];
}

export async function getServicios() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Servicio`,{
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        },
    });
    const data = await response.json();
    return data.Data || [];
}