import { useQuery } from "@tanstack/react-query";
import { supabase } from "../core/supabase";

const query = supabase.from("activities").select("emission.sum()");

export default function useActivitiesSum() {
    const queryResult = useQuery({
        queryKey: ["activity"]
    })
}