const attempt = (available, allowed, preffered) => {
    let pool;
    if (available.length === 0) pool = allowed;    
    else if(allowed.includes('any')) pool = available;
    else pool = available.filter(val => allowed.includes(val));

    const res = preffered.reduce((accum, prefVal) => {

        if(pool.length === 0) return accum;

        const best = prefVal === 'any' ? Math.max(...pool)
        : pool.reduce((best, current) =>{ 
            if((best < prefVal && current < prefVal) || (best > prefVal && current > prefVal)){
                if(Math.abs(prefVal - best) < Math.abs(prefVal - current)) return best;
                return current;
            }
            if(best < prefVal) return current;
            return best;
        });

        pool.splice(pool.indexOf(best), 1);

        return [...accum, best];    
    }, []);

    if(res.length === 0) throw new Error("error");

    return res.sort();
}