<script>
    import Hello from './components/Hello.svelte'
    const str = '我是一个Svelte';
    const imageURL = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2455057485,102104212&fm=26&gp=0.jpg';
    const htmlString = '<p>我是一个HTML</p>'
</script>

<p>{str}</p>

<img src={imageURL} alt=""/>

{@html htmlString}
<div>{@html htmlString}</div>

<Hello></Hello>

<style>
    p{
        color: #fffcfd;
    }
</style>