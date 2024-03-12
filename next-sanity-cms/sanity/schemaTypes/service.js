export const service = {
    name: 'service',
    title: 'service',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },

    ],

    preview: {
        select: {
            title: 'name',
            description: 'description',
        },
    },
}
