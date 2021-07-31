export const getPeriod = (from: Date | string, to: Date | string) => {
    let f: Date, t: Date;
    let res: string;
    if (typeof from === "string")
        f = new Date(from);
    else if (from instanceof Date)
        f = from;
    else
        f = new Date();
    if (typeof to === "string")
        t = new Date(to);
    else if (to instanceof Date)
        t = to;
    else
        t = new Date();
    const time = f.getTime() - t.getTime();

    if (Math.abs(time) <= 60 * 1000)
        return "ahora";
    if (time > 0) 
        res = "hace ";
    else
        res = "dentro de ";

    const min = Math.round(Math.abs(time) / (60 * 1000));

    if (min < 60) {
        if (min === 1)
            return res + "un minuto";
        else
            return res + min + " minutos";
    }

    const hor = Math.round(min / 60);

    if (hor < 24) {
        if (hor === 1)
            return res + "una hora";
        else
            return res + hor + " horas";
    }

    const dias = Math.round(hor / 24);
    
    if (dias < 31) {
        if (dias === 1) {
            if (time > 0)
                return "ayer";
            else
                return "mañana";
        } else {
            return res + dias + " días";
        }
    }

    const meses = Math.round(dias / 30);

    if (meses < 12) {
        if (meses === 1)
            return res + "un mes";
        else
            return res + hor + " meses";
    }
    
    return "más de un año";
};
