export async function getPosts() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const response = await fetch("https://social-network-api.osc-fr1.scalingo.io/foodbook/posts?page=0&limit=10", options);
    const data = await response.json();
    console.log("testlib")
    return data.posts;
}