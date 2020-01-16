export interface Participant {
    type: string;
    priority: number;
    id: string;
    name: string;
};

export interface Mail {
    uuid: string;
    object: string;
    creationDate: string;
    participants: Participant[];
    groups: any[];
    expeditor: string;
    historic: {
        messages: Message[]
    };
    // attachments : Attachment;
}

export interface Message {
    emitter: string;
    emissionMoment: string;
    // attachements : any[];
    body: {
        id: string;
        content: string;
        format: string;
    };
}

// export interface Attachment {
//     id: number;
//     version: string;
//     emissionMoment: string;
//     body: string;
// }


// PolytechFormat
export interface Score {
    score: number;
    base_score: number;
    subject: string;
    name: string;
}

export interface GroupScores {
    base_score: number;
    subject: string;
    name: string;
    score: LightScore[];
}

export interface LightScore {
    studentId: string;
    grade: number;
}

export interface LightMessage {
    uuid: string;
    emitter: string;
    body: string;
    bodySchema: string; // polytech ou string
    object: string;
    participants: string[]; // id list participants
}
