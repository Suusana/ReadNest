export interface Record {
    recordId: number
    username: string
    bookName: string
    borrowDate: Date
    DueDate: Date
    returnDate: Date
    status: number
}

export interface RecordRoot {
    records: Record[]
}

export interface Detail {
    recordId: number
    username: string
    email: string,
    avatar: string,
    bookName: string,
    description: string,
    author: string,
    cover: string,
    tags: string[],
    borrowDate: Date
    DueDate: Date
    returnDate: Date
    status: number
}

export interface DetailRoot {
    details: Detail[]
}

export interface userRecord {
    recordId: number
    username: string
    bookName: string,
    author: string,
    cover: string,
    tags: string[],
    borrowDate: Date
    DueDate: Date
    returnDate: Date
    status: number
}

export interface userRecordRoot {
    userRecords: userRecord[]
}
