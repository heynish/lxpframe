import { supabase } from '../lib/supabase';

interface UserData {
    address: string;
    loads: number;
}

export async function addUser(userData: UserData) {

    const { data, error } = await supabase
        .from('lxpframe') // Replace with your actual table name
        .insert([{
            address: userData.address,
            loads: userData.loads,
        }]);

    if (error) {
        console.error("Supabase insertion error:", error);
        return false; // Return false to indicate the operation failed
    }

    return true; // Return true to indicate the operation was successful
}

export async function incrementUserTotalLoads(address: string) {

    const { data, error } = await supabase
        .from('lxpframe') // Replace with your actual table name
        .select('id, loads')
        .eq('address', address)
        .single();

    if (error) {
        console.log("Supabase select error:", error);
        return false; // Return false to indicate the operation failed
    }

    if (data) {
        const { error: updateError } = await supabase
            .from('lxpframe') // Again, replace with your actual table name
            .update({
                loads: data.loads + 1,
                lastupdate: new Date(),
            })
            .match({ id: data.id });

        if (updateError) {
            console.log("Supabase update error:", updateError);
            return false; // Return false to indicate the operation failed
        }

        return true; // Return true to indicate the operation was successful
    } else {
        console.log("User not found for updating total loads");
        return false; // Return false to indicate the user was not found
    }
}
