<%!
    from pdoc.html_helpers import minify_css
%>
<%def name="homelink()" filter="minify_css">
    .homelink {
        display: block;
        font-size: 2em;
        font-weight: bold;
        color: #555;
        padding-bottom: .5em;
        border-bottom: 1px solid silver;
    }
    .homelink:hover {
        color: inherit;
    }
    .homelink img {
        max-width: 100%;
        max-height: 5em;
        margin: auto;
        margin-bottom: .3em;
    }
    .darkmode {
        display: none !important;
    }
</%def>
<style>${homelink()}</style>
<link rel="icon" href="icon.png">
