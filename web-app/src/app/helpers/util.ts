// Convert enum to array
export function enumToArray ( e: any ) {
    return Object.keys( e )
        .filter( StringIsNumber )
        .map( key => e[ key ] );
}

const StringIsNumber = ( value: string ) => isNaN( Number( value ) ) === false;