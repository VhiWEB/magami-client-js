import { api } from "~/helpers/api";

/**
 * Provide a name, to say hello to.
 *
 * @param {string} name
 * @param {number} id
 * @param {string} resWunner
 * 
 * @returns {string}!
 */

export const getWinner = async (id: number) => {
    try {
        const req = await api('GET', `list-winner?reward_id=${id}`);
        if (req) {
            const resWinner = await req.json();
            return resWinner.data;
        }
    } catch (error) {
        return error
    }
};