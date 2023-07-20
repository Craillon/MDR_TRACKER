export interface DataSet {
    fileName: string,
    data: Array<any>
}

export const extractData = (leftData: Array<any>) => {
    let arr =  new Array
    leftData.forEach( (_, index, tab) => {
        if (index > 0) {
            arr.push(tab[index][0])
        }
    })
    return arr
}

export const compareLR = (dataLeft: Array<any>, dataRight: Array<any>, data_set: DataSet[]) => {
    let mdr_filter = new Array
    dataLeft.forEach((data, index, arr) => {
        if (!dataRight.includes(data)) {
            mdr_filter.push({
                fileName: data_set[0].fileName,
                data: data_set[0].data.find( (d, i) => d.includes(data))
            })
        }
        mdr_filter
    })
    //
    dataRight.forEach(data => {
        if (!dataLeft.includes(data)) {
            mdr_filter.push({
                fileName: data_set[1].fileName,
                data: data_set[0].data.find( (d, i) => d.includes(data))
            })
        }
    })
    //
    return mdr_filter
}

export const getExtension = (url: string) => {
    const arr = new Array<string>();
    arr.push(...url.split('.'))
    return arr.at(-1)
}